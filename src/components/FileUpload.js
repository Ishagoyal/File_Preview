import React, { Component } from 'react';
import '../styles/FileUpload.css';

import fileIcon from '../icons/file.png';

class FileUpload extends Component {
  
  constructor(props){
    super(props);
    this.state = {
			fileUrl: [],
			isUploading:false,
			isDragOver:false,
			isOnDrop:false,
			fileName:'',
			fileLength:'',
    }
	}

	onDragOver(event){
		event.preventDefault();
		event.stopPropagation();
		this.setState({
			isDragOver:true,
		})
	}

	handleDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		let files = event.dataTransfer.files;
		this.setState({
			isDragOver:false,
			isOnDrop:true,
			isUploading:true,
			fileLength:files.length
		})
		for(var i=0;i<files.length;i++){
			this.readFiles(files[i]);
		}
	}
	
	 readFiles=(file)=>{
		var reader = new FileReader();
		reader.onload = ()=>{
			var dataURL = reader.result;
			if(this.state.fileUrl.includes(dataURL)){
				alert(file.name + " file has been already uploaded. Upload another file.");
			}
			else{
				this.setState({
					fileUrl:[...this.state.fileUrl, dataURL],
					fileName:file.name,
				})		
			}
		}
		reader.readAsDataURL(file);	
	};
   
  fileInputHandler(event){
		for(var i= 0; i < event.target.files.length ; i++ ){
		  this.readFiles(event.target.files[i]);
		}
  }
   
  uploadHandler(){
		this.setState({
			isUploading:true,
			isOnDrop:false,
		})
	}

	removeFile(event, imageSrc){
		var filteredArray;
		if((imageSrc.split(',')[0].split(':')[1].split('/')[0]) === "image"){
			filteredArray = this.state.fileUrl.filter(item => item !== event.target.src);
		}
		else{
			filteredArray = this.state.fileUrl.filter(item => item !== event.target.name);
		}
		this.setState({
			isUploading:true,
			isOnDrop:false,
			fileUrl: filteredArray
		})
	}
	renderPreview(){
		return(
			<ul className="Preview">
			{this.state.isUploading ? this.state.fileUrl.map((imageSrc) => (
				<li key={imageSrc}>
					{(imageSrc.split(',')[0].split(':')[1].split('/')[0]) === "image" ? (
						<img className="image" onClick={(event)=>this.removeFile(event,imageSrc)} src={imageSrc} alt="Cannot Display"></img>
					):(<img className="image" onClick={(event)=>this.removeFile(event,imageSrc)} src={fileIcon} name={imageSrc} alt="Cannot Display"></img>)}
					<span className='removeItem'>X</span>	
				</li>	
			)):(null)}
		</ul>
		)
	}
	
  render() {
    return (
			<div 
			id="drop-area" 
			className={`FileUpload ${this.state.isDragOver ? 'highlight':'FileUpload'}`} 
			onDrop={(event)=>this.handleDrop(event)}
			onDragOver={(event)=>this.onDragOver(event)} 
			>
				<p>Upload multiple files with the file dialog or by dragging and dropping files onto the dashed region</p>
        <input className="fileInput" type='file' multiple onChange={(event)=>this.fileInputHandler(event)}></input>
        <button className="uploadButton" onClick={()=>this.uploadHandler()}>Upload</button>
				{this.state.isOnDrop ? (<div>{this.state.fileLength > 1 ? this.state.fileLength  : this.state.fileName} File Selected</div>):null}
				<div className="dropText">Drop Files here</div>
				{this.renderPreview()}
      </div>
    );
  }
}

export default FileUpload;
