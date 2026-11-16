function AddButton({ onClick, children = "Adicionar" }) {
    return (
        <div className="d-flex justify-content-end mt-5 ms-4">
            <button
                type="button"
                onClick={onClick}
                className="btn btn-danger rounded"
            >
                {children}
            </button>
        </div>
    );
}

export default AddButton;