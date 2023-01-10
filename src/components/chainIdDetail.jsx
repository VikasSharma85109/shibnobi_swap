
import "react-tabs/style/react-tabs.css";
// icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
//importing media assets
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function chainIdDetail({name}) {
 return (
   <div className="p10">
     <p className="allfontsizeSet">{name} </p>
     <div
       style={{
         display: "flex",
         justifyContent: "space-between",
         backgroundColor: "#212429",
         alignItems: "center",
         padding: 10,
       }}
     >
       <p>{"accountbalnced"}</p>
       <p className="allfontsizeSet">
         <CopyToClipboard
           text={"accountbalnced"}
           onCopy={() => alert("copied")}
         >
           <ContentCopyIcon />
         </CopyToClipboard>
       </p>
     </div>
     <br></br>
     <div
       style={{
         display: "flex",
         justifyContent: "space-between",
         paddingTop: 5,
       }}
     >
       <p className="small ">Amount</p>
       <p className="small ">0</p>
     </div>
     <hr />{" "}
     <div
       style={{
         display: "flex",
         justifyContent: "space-between",
         paddingTop: 5,
       }}
     >
       <p className="small ">Balance</p>
       <p className="small ">$0</p>
     </div>
     <div style={{ marginTop: 50, marginBottom: 50 }}>
       <div
         style={{
           display: "flex",
           marginBottom: 10,
         }}
       >
         <img
           src="https://bscscan.com/images/logo-bscscan.svg?v=0.0.3"
           alt="https://bscscan.com/"
           height={35}
           style={{ backgroundColor: "white" }}
         />
       </div>

       <div>
         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
           }}
         >
           <p className="small">Total Supply</p>
           <p className="small">{"apiresult1"}</p>
         </div>
         <hr></hr>

         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
           }}
         >
           <p className="small">Market Cap</p>
           <p className="small">$32,430,000</p>
         </div>
         <hr></hr>

         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
           }}
         >
           <p className="small">Transactions</p>
           <p className="small">65,624</p>
         </div>
         <hr></hr>

         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
           }}
         >
           <p className="small">Holders</p>
           <p className="small">67,750</p>
         </div>
       </div>
     </div>
   </div>
 );
}
