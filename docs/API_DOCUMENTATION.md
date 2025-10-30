# BA Installments Playground - API Documentation

## 🔗 API Overview

The BA Installments Playground includes a complete API simulation layer built with Next.js API routes. All endpoints return realistic responses with proper error handling, but **no real payments are processed**.

**Base URL:** `http://localhost:3332/api`

---

## 📋 Eligibility API

### `POST /api/eligibility`

Check if a customer is eligible for a specific instalment model.

#### Request Body
```typescript
{
  model: ModelKey,        // 'bnpl' | 'psp' | 'merchant' | 'acquirer' | etc.
  basket: {
    currency: string,     // 'EUR'
    total: number,        // Amount in euros
    isReturn: boolean,    // True for return journeys
    market: 'ES'|'UK'|'EU'
  },
  customer?: {
    name?: string,
    email?: string,
    phone?: string,
    residency?: 'ES'|'UK'|'Other',
    idType?: 'DNI'|'NIE'|'None',
    idValue?: string
  }
}
```

#### Response
```typescript
{
  eligible: boolean,
  reasons: string[],      // Array of failure reasons
  requiredFields: string[] // Missing required fields
}
```

#### Example Request
```bash
curl -X POST http://localhost:3332/api/eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "model": "bnpl",
    "basket": {
      "currency": "EUR", 
      "total": 180,
      "isReturn": true,
      "market": "ES"
    },
    "customer": {
      "residency": "ES",
      "idType": "DNI"
    }
  }'
```

#### Example Response
```json
{
  "eligible": true,
  "reasons": [],
  "requiredFields": []
}
```

#### Business Rules by Model

**BNPL:**
- Market must be ES (Spain)
- Return journey required  
- Minimum €45 basket
- Spanish DNI/NIE required

**PSP:**
- Valid payment card
- EU/UK markets eligible
- Minimum €45 basket

**Merchant:**
- Email address required
- Minimum €45 basket
- MIT consent needed

**Acquirer:**
- EU/UK markets eligible
- Minimum €100 (Spain)
- Acquirer service available

**Issuer Pre:**
- Eligible card BIN
- Bank supports instalments
- Transaction suitable amount

**Deferred:**
- Maximum €1000
- Valid payment method
- Email for reminders

**Deposit+Balance:**
- Return journey required
- Valid payment card
- Travel date allows plan

---

## 💰 Plan Quote API

### `POST /api/plan-quote`

Calculate payment plan details for a given basket and terms.

#### Request Body
```typescript
{
  basket: {
    currency: string,
    total: number,
    isReturn: boolean,
    market: 'ES'|'UK'|'EU'
  },
  months: number,         // 3, 6, 9, or 12
  mode: 'promo0'|'fee2'|'apr149'
}
```

#### Response
```typescript
{
  months: number,
  apr?: number,           // Annual percentage rate (if applicable)
  feePct?: number,        // Fixed fee percentage (if applicable)  
  firstPayment: number,   // Amount due today
  monthly: number,        // Monthly payment amount
  totalToPay: number      // Total amount including fees/interest
}
```

#### Pricing Modes

**promo0:** 0% APR promotional offer
- No additional cost
- Total = basket amount
- Equal monthly payments

**fee2:** 2% fixed fee
- Total = basket amount × 1.02
- Fee applied upfront
- Equal monthly payments

**apr149:** 14.9% APR example  
- Interest calculated annually
- Total = basket × (1 + 0.149 × (months/12))
- Equal monthly payments

#### Example Request
```bash
curl -X POST http://localhost:3332/api/plan-quote \
  -H "Content-Type: application/json" \
  -d '{
    "basket": {"total": 180, "currency": "EUR"},
    "months": 6,
    "mode": "promo0"
  }'
```

#### Example Response
```json
{
  "months": 6,
  "firstPayment": 30.00,
  "monthly": 30.00,
  "totalToPay": 180.00
}
```

---

## 🔒 Authorization API

### `POST /api/authorise`

Simulate payment authorization with optional 3D Secure.

#### Request Body
```typescript
{
  pan: string,            // 16-digit card number
  amount: number,         // Authorization amount
  currency?: string       // Default 'EUR'
}
```

#### Response - Direct Authorization
```typescript
{
  authorised: boolean,
  authCode?: string,      // 6-character auth code
  transactionId: string,  // Unique transaction ID
  amount: number,
  currency: string
}
```

#### Response - 3D Secure Required
```typescript
{
  requires3DS: boolean,
  transactionId: string,
  threeDSUrl: string,     // Always '/api/complete-3ds'
  amount: number,
  currency: string
}
```

#### Response - Declined
```typescript
{
  authorised: false,
  declineReason: string,
  transactionId: string
}
```

#### Card Behavior Simulation

**3D Secure Trigger:** Cards starting with `4111` or `5555`
**Auto Decline:** Cards ending with `0000`
**Direct Auth:** All other valid 16-digit PANs

#### Example Request
```bash
curl -X POST http://localhost:3332/api/authorise \
  -H "Content-Type: application/json" \
  -d '{
    "pan": "4111111111111111",
    "amount": 60.00
  }'
```

#### Example Response (3DS Required)
```json
{
  "requires3DS": true,
  "transactionId": "tx_1725389851234_abc123def",
  "threeDSUrl": "/api/complete-3ds",
  "amount": 60.00,
  "currency": "EUR"
}
```

---

## 🛡️ 3D Secure Completion API

### `POST /api/complete-3ds`

Complete 3D Secure authentication flow.

#### Request Body
```typescript
{
  transactionId: string,
  threeDSResult?: any     // Optional 3DS result data
}
```

#### Response - Success
```typescript
{
  authorised: boolean,
  authCode: string,
  transactionId: string,
  threeDSStatus: 'Y'      // Authentication successful
}
```

#### Response - Failure  
```typescript
{
  authorised: false,
  transactionId: string,
  threeDSStatus: 'N',     // Authentication failed
  declineReason: string
}
```

#### Success Rate
- **90% success rate** in simulation
- **1 second processing delay** for realism

#### Example Request
```bash
curl -X POST http://localhost:3332/api/complete-3ds \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId": "tx_1725389851234_abc123def"
  }'
```

---

## 🔄 Provider Integration APIs

### `POST /api/provider/start`

Initialize provider redirect for BNPL/Acquirer flows.

#### Request Body
```typescript
{
  model: string,          // Model type
  amount: number,
  customer?: object,
  plan?: object
}
```

#### Response
```typescript
{
  url: string,            // Provider URL (simulated)
  sessionId: string,      // Session identifier
  payload: object,        // Provider-specific payload
  method: 'POST'
}
```

#### Provider URLs by Model
- **BNPL:** `https://klarna.example/start`
- **Acquirer:** `https://acquirer.example/instalments`
- **Default:** `https://provider.example/start`

### `POST /api/provider/complete`

Handle provider callback/completion.

#### Request Body
```typescript
{
  sessionId: string,
  status?: string,
  providerReference?: string
}
```

#### Response - Approved
```typescript
{
  result: 'approved',
  planId: string,
  sessionId: string,
  providerReference: string,
  approvalCode: string,
  message: string
}
```

#### Response - Declined
```typescript
{
  result: 'declined', 
  sessionId: string,
  reason: string,
  canRetry: boolean
}
```

#### Approval Rate
- **85% approval rate** in simulation
- **Random decline reasons** for demo variety

---

## 📄 Terms & Conditions API

### `GET /api/terms`

Retrieve terms and conditions for specific models and markets.

#### Query Parameters
- `model` - Model key (bnpl, psp, merchant, etc.)
- `market` - Market code (ES, UK, EU) - optional

#### Response
```
Content-Type: text/html
Cache-Control: public, max-age=3600

<h4>Model Terms & Conditions</h4>
<p>Model-specific terms content...</p>
<ul>
  <li>Key term 1</li>
  <li>Key term 2</li>
</ul>
```

#### Example Request
```bash
curl "http://localhost:3332/api/terms?model=bnpl&market=ES"
```

#### Available Terms
- **bnpl** - ES specific, default fallback
- **psp** - Default terms
- **merchant** - BA instalment terms
- **acquirer** - Acquirer-specific terms
- **issuer-pre** - Bank instalment terms
- **issuer-post** - Post-purchase conversion
- **deferred** - Pay later terms
- **deposit-balance** - Deposit+balance terms
- **hybrid** - Smart routing terms

---

## 🚫 Error Handling

### HTTP Status Codes

**200 OK** - Successful request  
**400 Bad Request** - Missing or invalid parameters  
**404 Not Found** - Resource not found (terms)  
**500 Internal Server Error** - System error

### Error Response Format
```typescript
{
  error: string,          // Error message
  details?: any           // Additional error context
}
```

### Common Errors

**Missing Fields:**
```json
{
  "error": "Missing required fields",
  "details": ["pan", "amount"]
}
```

**Invalid Model:**
```json
{
  "error": "Invalid model type"
}
```

**System Error:**
```json
{
  "error": "System error"
}
```

---

## ⏱️ Response Times

All APIs include realistic delays for simulation:

- **Eligibility:** Immediate (< 100ms)
- **Plan Quote:** 500ms processing delay  
- **Authorization:** 500ms processing delay
- **3D Secure:** 1000ms authentication delay
- **Provider Start:** 800ms redirect setup
- **Provider Complete:** 800ms decision delay
- **Terms:** Cached, immediate response

---

## 🧪 Testing the APIs

### Using curl
```bash
# Test eligibility
curl -X POST http://localhost:3332/api/eligibility \
  -H "Content-Type: application/json" \
  -d '{"model":"bnpl","basket":{"total":180,"market":"ES","isReturn":true}}'

# Test plan quote  
curl -X POST http://localhost:3332/api/plan-quote \
  -H "Content-Type: application/json" \
  -d '{"basket":{"total":180},"months":3,"mode":"promo0"}'

# Test authorization
curl -X POST http://localhost:3332/api/authorise \
  -H "Content-Type: application/json" \
  -d '{"pan":"4111111111111111","amount":60}'
```

### Using JavaScript/Frontend
```javascript
// Eligibility check
const eligibilityResponse = await fetch('/api/eligibility', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'bnpl',
    basket: { total: 180, market: 'ES', isReturn: true }
  })
});

const eligibility = await eligibilityResponse.json();
```

---

## 🔐 Security Notes

### Demo Limitations
- **No real payment processing** - all responses are simulated
- **No PCI compliance required** - no real card storage
- **No authentication** - APIs are open for demo purposes
- **No rate limiting** - unlimited requests allowed

### Production Considerations
If adapting for production:
1. **Add authentication** and authorization
2. **Implement rate limiting** and request validation  
3. **Add PCI compliance** measures for card handling
4. **Use HTTPS** for all payment-related requests
5. **Add request/response logging** for audit trails
6. **Implement proper error handling** without information leakage

---

## 📚 Integration Examples

### React Hook Example
```typescript
const useEligibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkEligibility = async (model: string, basket: Basket) => {
    setLoading(true);
    try {
      const response = await fetch('/api/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, basket })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Eligibility check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, checkEligibility };
};
```

### Payment Flow Example
```typescript
const processPayment = async (pan: string, amount: number) => {
  // Step 1: Authorization
  const authResponse = await fetch('/api/authorise', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pan, amount })
  });
  const authResult = await authResponse.json();

  // Step 2: Handle 3DS if required
  if (authResult.requires3DS) {
    const threeDSResponse = await fetch('/api/complete-3ds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        transactionId: authResult.transactionId 
      })
    });
    return await threeDSResponse.json();
  }

  return authResult;
};
```

This API documentation provides complete reference for integrating with the BA Installments Playground simulation layer.