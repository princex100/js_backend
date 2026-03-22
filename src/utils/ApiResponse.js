class ApiResponse{
  constructor(statuscode,data,message="Succes"){
    this.data=data
    this.message=message
    this.statuscode=statuscode
    this.success=statuscode<400
  }
}