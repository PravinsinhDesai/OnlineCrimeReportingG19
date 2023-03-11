import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/button";
import axios from "axios";
import config from "../../../config";
import { toast } from "react-toastify";
import Sidebar from "../Navbar/SideBar";

const ComplaintList = () => {
  const [id, setId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }

  const getAllComplaints = () => {
    axios
      .get(config.serverURL + "/api/admin/getallcomplaints", {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        const result = response["data"];
        setComplaints(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const furtherDetails = (id) => {
    navigate("/api/admin/complaints/details", {
      state: { complaintId: id },
    });
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <>
      <Sidebar />
      <div style={{height:menuHeight}}>
      <div style={styles.container}>
        <div className="container">
          <h3 style={{ textAlign: "center", margin: 20 }}>Complaint List</h3>
          {
            //conditional rendering if 1st condition is true then have to go to execute the 2nd statement(condition)
            complaints.length === 0 && (
              <h4 style={{ textAlign: "center", margin: 20 }}>
                No Complaints Are Registered Yet!
              </h4>
            )
          }
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Case Type</th>
                <th>Reporting Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Look Into Further Details If Any</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => {
                return (
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>
                    <td>{complaint.caseTypeSelected.caseType}</td>
                    <td>{complaint.reportingDate}</td>
                    <td>{complaint.location}</td>
                    <td>{complaint.complaintStatus}</td>
                    <td>
                      {complaint.caseTypeSelected.caseType ===
                        "MOTOR_VEHICLE_THEFT" && (
                        <Button
                          onClick={() => furtherDetails(complaint.id)}
                          title="Details"
                        />
                      )}
                      {complaint.caseTypeSelected.caseType ===
                        "MISSING_OR_STOLEN_MOBILE_PHONES" && (
                        <Button
                          onClick={() => furtherDetails(complaint.id)}
                          title="Details"
                        />
                      )}
                      {complaint.caseTypeSelected.caseType ===
                        "MISSING_CHILD_OR_PERSON" && (
                        <Button
                          onClick={() => furtherDetails(complaint.id)}
                          title="Details"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};
export default ComplaintList;

const styles = {
  container: {
    width: "max-content",
    height: "auto",
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    padding: 0,
    marginLeft: "250px",
    marginRight: "auto",
    marginBottom: "15px",
    borderColor: "#BAF6FF",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  addButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    //marginLeft: 610,
  },
};
