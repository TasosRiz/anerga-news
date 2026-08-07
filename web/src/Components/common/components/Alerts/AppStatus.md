Reusable status/alert component για loading, error, success, empty και info messages.

Το χρησιμοποιούμε για να μη γράφουμε σε κάθε page ξεχωριστά:

```jsx
{loading && <div>Φόρτωση...</div>}
{error && <div>{error}</div>}
{successMessage && <div>{successMessage}</div>}
{items.length === 0 && <div>Δεν υπάρχουν δεδομένα.</div>}

<AppStatus
    loading={loading}
    error={error}
    success={successMessage}
    empty={items.length === 0}
    loadingMessage="Φόρτωση..."
    emptyMessage="Δεν υπάρχουν δεδομένα."
/>