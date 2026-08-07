.create-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.label-text {
    font-weight: 600;
}

.create-form input,
.create-form select,
.create-form textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 15px;
}

.create-form textarea {
    resize: vertical;
}

.create-form-actions {
    display: flex;
    justify-content: flex-end;
}

.btn-action {
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.btn-save {
    background: #2563eb;
    color: white;
}

.btn-save:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}