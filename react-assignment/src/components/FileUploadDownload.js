import React, { useEffect } from "react";
import { useState } from "react";

import './../App.css';
import axios from 'axios';
import { DropzoneArea } from "material-ui-dropzone";
import { GoogleLogout } from "react-google-login";
import { saveAs } from "file-saver";


const FileUploadDownload = (props) => {
    const {profile , onLogout} = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileUploadedSuccessfully, setFileUploadedSuccessfully] = useState(false)
    const [showFileData, setShowFileData] = useState([])

    const [files, setFiles] = useState([])
    
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';

    useEffect (() => {
        console.log("showFileData",showFileData)
        axios.get("https://d1v4lusol6.execute-api.us-west-2.amazonaws.com/prod/file-upload").then((response) => {
            console.log(response)
            //setShowFileData(response.data)
        }) 
    },[showFileData])

    
    const onFileChange = (event) => {
        setSelectedFile(event)
        setFiles(event)
    }

    const onFileUpload = () => {
        const formData = new FormData()
        setShowFileData(prevState => ({
            ...prevState,
            name : profile.name,
            email : profile.email,
            files : files
        }))
        
        selectedFile.map((selectFile) => {
            formData.append(
                "files",
                selectFile,
                selectFile.name
            )
        })
            //call api
            axios.post("https://d1v4lusol6.execute-api.us-west-2.amazonaws.com/prod/file-upload",formData).then(() => {
                setSelectedFile(null);
                setFileUploadedSuccessfully(true)
            }) 
    }

    const onFileDownload = () => {
        files.map((f) => {
            saveAs(f)
        })
    }

    const fileData = () => {
        if(selectedFile) {
            return (
                <div>
                    <div>
                    {selectedFile.name}                   
                </div>
                <div>
                </div>
                </div>
            )
        }
        else if (fileUploadedSuccessfully){
            return (
                <div>File has been successfully uploaded.</div>
            )
        }
        else {
            return (
                <div>Choose one file and click upload.</div>
            )
        }
    }

    return (
        <div className="container">
            <h2>Hai {profile.name}</h2>
            <p>{profile.email}</p>
            <div>
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={onLogout} />  
            </div>
            <div>
                {/* <input type="file" onChange={onFileChange} /> */}
                <DropzoneArea
                    acceptedFiles={[
                        ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.ms-excel,application/vnd.ms-excel.sheet.macroEnabled.12, application/msexcel, application/x-msexcel, application/x-ms-excel, application/x-excel, application/x-dos_ms_excel,application/xls, application/x-xls,  application/x-msi, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.jpeg,.png,.pdf,.txt,.json,.csv,.txt,.text,application/json,text/csv,text/plain",
                    ]}
                    filesLimit={1}
                    onChange={onFileChange}
                    showAlerts={false}
                    maxFileSize={100000000}
                    dropzoneText={"Select Files"}
                    showFileNames={true}
                />
                <button onClick={onFileUpload}>Upload Files</button>
                <button onClick={onFileDownload}>Download files</button>
            </div>
            {fileData()}
        </div>
    )
}

export default FileUploadDownload;