import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

const Modelpopup = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [warningMsg, setwarningMsg] = useState("");
  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row">
                  <label className="labelField">Slippage Tolerance</label>
                </div>
                <div className="row">
                  <ButtonGroup aria-label="">
                    <Button
                      className={slippageAmount == "0.1" && "active"}
                      variant="secondary"
                      onClick={() => {
                        setwarningMsg("Your transaction may fail");
                        setSlippageAmount("0.1");
                      }}
                    >
                      0.1%
                    </Button>
                    <Button
                      className={slippageAmount == "0.5" && "active"}
                      variant="secondary"
                      onClick={() => {
                        setwarningMsg("");
                        setSlippageAmount("0.5");
                      }}
                    >
                      0.5%
                    </Button>
                    <Button
                      className={slippageAmount == "  1" && "active"}
                      variant="secondary"
                      onClick={() => {
                        setwarningMsg("");
                        setSlippageAmount("1");
                      }}
                    >
                      1%
                    </Button>
                  </ButtonGroup>
                  <div className="col-md-12 inputFieldUnitsContainer">
                    <span>{warningMsg}</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 fieldContainer">
                    <input
                      className="inputField"
                      placeholder="10"
                      value={slippageAmount}
                      onChange={(e) => {
                        setwarningMsg("");
                        setSlippageAmount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="labelField">Transaction Deadline</label>
                </div>
                <div className="row">
                  <div className="col-md-6 fieldContainer">
                    <input
                      className="inputField"
                      placeholder="10"
                      value={deadlineMinutes}
                      onChange={(e) => setDeadlineMinutes(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 inputFieldUnitsContainer">
                    <span>minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Modelpopup;
