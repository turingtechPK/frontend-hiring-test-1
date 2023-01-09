interface props {
  id: string;
  closeModal: Function;
}

function DetailModal({ id, closeModal }: props) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add Notes <br /> <span className="id">{id}</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                closeModal();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
