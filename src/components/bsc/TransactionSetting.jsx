import "./style.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import "react-tabs/style/react-tabs.css";

export default function TransactionSetting({
  show,
  handleClose,
  mode,
  warningMsg22,
  onChangeEvent,
  deadlineMinute,
  slippage,
  deadlineMinutes1,
}) {
  const [slippageAmount, setSlippageAmount] = useState(0.5);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [warningMsg, setwarningMsg] = useState("");
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={mode === "dark" ? "dark" : "light"}
    >
      <Modal.Header closeButton className={mode === "dark" ? "dark" : "light"}>
        <Modal.Title className={mode === "dark" ? "dark" : "light"}>
          Transaction setting{slippage}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={mode === "dark" ? "dark" : "light"}>
        <div className={mode === "dark" ? "dark" : "light"}>
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <label className="labelField">Slippage Tolerance</label>
              </div>
              <div className="row">
                <ButtonGroup aria-label="Basic example">
                  <Button
                    className={slippage == "0.1" ? "active" : ""}
                    variant="secondary"
                    onClick={() => {
                      setwarningMsg("Your transaction may fail");
                      setSlippageAmount("0.1");
                    }}
                  >
                    0.1%
                  </Button>
                  <Button
                    className={slippageAmount == "0.5" ? "active" : ""}
                    variant="secondary"
                    className={slippage == "0.5" ? "active" : ""}
                    onClick={() => {
                      setwarningMsg(" ");
                      setSlippageAmount("0.5");
                    }}
                  >
                    0.5%
                  </Button>
                  <Button
                    variant="secondary"
                    className={slippageAmount == "1" ? "active" : ""}
                    className={slippage == "1" ? "active" : ""}
                    onClick={() => {
                      setwarningMsg(" ");
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
                    onChange={(e) => deadlineMinute(e.target.value)}
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
  );
}
