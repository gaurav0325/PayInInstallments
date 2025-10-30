#!/bin/bash

mkdir -p BA-PayInInstalments-Options/frontend/src/frontend/public

cat > BA-PayInInstalments-Options/server.js << 'EOF'
/* [Insert full server.js code here from previous messages] */
EOF

cat > BA-PayInInstalments-Options/package.json << 'EOF'
{
  "name": "ba-pay-in-instalments",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.1"
  },
  "scripts": {
    "start": "node server.js"
  }
}
EOF

cat > BA-PayInInstalments-Options/render.yaml << 'EOF'
services:
  - type: web
    name: BA-PayInInstalments-Options
    env: node
    plan: free
    buildCommand: npm install && npm run build-frontend
    startCommand: node server.js
    envVars:
      - key: ADMIN_PASSWORD
        value: admin-demo-password
      - key: KLARNA_USERNAME
        value: playground_user
      - key: KLARNA_PASSWORD
        value: playground_pass
      - key: KLARNA_ENV
        value: playground
      - key: ADYEN_APIKEY
        value: test_adyen_api_key
      - key: ADYEN_MERCHANT_ACCOUNT
        value: TestMerchant
      - key: APP_BASE_URL
        value: https://ba-payininstalments-options.onrender.com
EOF

cat > BA-PayInInstalments-Options/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
EOF

mkdir -p BA-PayInInstalments-Options/frontend/src
mkdir -p BA-PayInInstalments-Options/frontend/public

cat > BA-PayInInstalments-Options/frontend/package.json << 'EOF'
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@adyen/adyen-web": "^7.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
EOF

cat > BA-PayInInstalments-Options/frontend/src/App.js << 'EOF'
import React, { useEffect, useState } from 'react';
import Checkout from './Checkout';
import Admin from './Admin';

export default function App() {
  const [view, setView] = useState('checkout'); // or 'admin'

  return (
    <div>
      <header style={{ padding: '10px', background: '#003366', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Airline Instalment Payments</h1>
        <button
          onClick={() => setView(view === 'checkout' ? 'admin' : 'checkout')}
          style={{ background: 'white', color: '#003366', border: 'none', borderRadius: 4, padding: '5px 10px', cursor: 'pointer' }}
        >
          {view === 'checkout' ? 'Admin' : 'Customer'}
        </button>
      </header>

      {view === 'checkout' ? <Checkout /> : <Admin />}
    </div>
  );
}

EOF

cat > BA-PayInInstalments-Options/frontend/src/Checkout.js << 'EOF'
import React, { useEffect, useState } from 'react';

export default function Checkout() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState(250); // sample fare amount
  const [currency, setCurrency] = useState('GBP');
  const [workflowId, setWorkflowId] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/options')
      .then((res) => res.json())
      .then(setOptions)
      .catch(console.error);
  }, []);

  const startPayment = () => {
    if (!selectedOption) return alert('Please select a payment option');
    setStatus('Initiating payment...');
    fetch('/api/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionId: selectedOption, amount, currency }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkflowId(data.workflowId);
        setStatus('Payment initiated. You will be redirected to provider...');
        // TODO: Redirect or show Klarna widget or Adyen drop-in per option.provider
      })
      .catch(() => setStatus('Error initiating payment.'));
  };

  return (
    <div style={{ maxWidth: 420, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Select Instalment Payment Option</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {options.map((o) => (
          <li key={o.id} style={{ marginBottom: 10 }}>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value={o.id}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {' '}
              {o.label}
            </label>
          </li>
        ))}
      </ul>

      <div>
        <label>
          Amount: &nbsp;
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: 100 }}
          />
          &nbsp;{currency}
        </label>
      </div>

      <button
        onClick={startPayment}
        style={{
          marginTop: 20,
          backgroundColor: '#0077cc',
          border: 'none',
          padding: '10px 20px',
          color: 'white',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Pay in Instalments
      </button>

      {workflowId && <p><strong>Workflow ID:</strong> {workflowId}</p>}
      {status && <p>{status}</p>}
    </div>
  );
}

EOF

cat > BA-PayInInstalments-Options/frontend/src/Admin.js << 'EOF'
import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [workflows, setWorkflows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/admin/api/workflows', {
      headers: {
        Authorization: 'Basic ' + btoa('admin:admin-demo-password'),
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setWorkflows)
      .catch((e) => alert('Admin auth failed or server error: ' + e.message));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Admin Dashboard: Payment Workflows</h2>
      <div style={{ display: 'flex' }}>
        <ul style={{ width: 300, listStyle: 'none', padding: 0, borderRight: '1px solid #ccc' }}>
          {workflows.map((w) => (
            <li
              key={w.id}
              onClick={() => setSelected(w)}
              style={{
                cursor: 'pointer',
                padding: 8,
                backgroundColor: selected?.id === w.id ? '#eef' : 'transparent',
                borderBottom: '1px solid #ddd',
              }}
            >
              {w.optionId} - {w.status} - £{w.amount}
            </li>
          ))}
        </ul>
        <div style={{ flex: 1, padding: 10 }}>
          {selected ? (
            <>
              <h3>Workflow ID: {selected.id}</h3>
              <p>
                <b>Option:</b> {selected.optionId}
              </p>
              <p>
                <b>Amount:</b> £{selected.amount} {selected.currency}
              </p>
              <p>
                <b>Status:</b> {selected.status}
              </p>
              <h4>Events</h4>
              <ul>
                {selected.events.map((e, i) => (
                  <li key={i}>
                    {new Date(e.timestamp).toLocaleString()}: {e.event}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a workflow to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}

EOF

cat > BA-PayInInstalments-Options/frontend/src/KlarnaWidget.js << 'EOF'
import React, { useEffect, useRef } from 'react';

export default function KlarnaWidget({ clientToken, onComplete }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!clientToken) return;

    // Load Klarna JS SDK
    const script = document.createElement('script');
    script.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js';
    script.async = true;
    script.onload = () => {
      if (window.Klarna) {
        window.Klarna.Payments.load(
          {
            container: containerRef.current,
            payment_method_category: 'pay_later',
            client_token: clientToken,
          },
          (response) => {
            if (response.show_form) {
              // Widget loaded successfully
            } else if (response.error) {
              console.error('Klarna Widget error:', response.error);
            }
          }
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [clientToken]);

  return <div ref={containerRef} />;
}

EOF

cat > BA-PayInInstalments-Options/frontend/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Airline Instalment Payments</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOF

cat > BA-PayInInstalments-Options/frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
EOF

echo "Setup complete! Navigate to BA-PayInInstalments-Options and run your install/build commands."
