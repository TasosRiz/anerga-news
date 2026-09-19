# AppStatus

Reusable component για την εμφάνιση κοινών καταστάσεων UI.

Χρησιμοποιείται για:
- loading
- error
- success
- empty state
- info message

Στόχος είναι να μην επαναλαμβάνεται το ίδιο conditional JSX σε κάθε page ή component.

## Παράδειγμα χωρίς AppStatus

```jsx
{loading && <div>Φόρτωση...</div>}

{error && <div>{error}</div>}

{successMessage && (
    <div>{successMessage}</div>
)}

{!loading &&
    !error &&
    items.length === 0 && (
        <div>
            Δεν υπάρχουν δεδομένα.
        </div>
    )}
```

## Παράδειγμα με AppStatus

```jsx
<AppStatus
    loading={loading}
    error={error}
    success={successMessage}
    empty={
        !loading &&
        !error &&
        items.length === 0
    }
    loadingMessage="Φόρτωση..."
    emptyMessage="Δεν υπάρχουν δεδομένα."
/>
```

## Παράδειγμα σε λίστα δεδομένων

```jsx
<AppStatus
    loading={loading}
    error={error}
    empty={
        !loading &&
        !error &&
        users.length === 0
    }
    loadingMessage="Φόρτωση χρηστών..."
    emptyMessage="Δεν βρέθηκαν χρήστες."
    center
/>

{!loading &&
    !error &&
    users.length > 0 && (
        <UserList users={users} />
    )}
```

## Παράδειγμα σε form

```jsx
<AppStatus
    error={error}
    success={successMessage}
/>
```

## Διαθέσιμα props

```jsx
<AppStatus
    loading={false}
    error=""
    success=""
    empty={false}
    info=""
    loadingMessage="Φόρτωση..."
    errorMessage=""
    successMessage=""
    emptyMessage="Δεν υπάρχουν δεδομένα."
    infoMessage=""
    center={false}
/>
```

Το component εμφανίζει μόνο την πρώτη ενεργή κατάσταση με σειρά προτεραιότητας:

```text
loading
→ error
→ success
→ empty
→ info
```