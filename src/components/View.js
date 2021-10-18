import React,{useEffect,useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import Button from '@mui/material/Button';
import AddEditModal from './AddEditModal';
import EditModal from './EditModal';






function View() {



    
const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'Restarurant name', width: 230 },
    { field: 'published_at', headerName: 'Published At', width: 230 },
    {
      field: 'created_at',
      headerName: 'Created At',
     width: 230,
    },
    {
        field: 'updated_at',
        headerName: 'Updated At',
    
        width: 230,
      },
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        renderCell: (params) => {
       
    
          return <Button variant="contained" onClick={()=>editHAndler(params.row)}>Edit</Button>
        },
        
    },
    {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        renderCell: (params) => {
       
    
          return<Button variant="outlined" onClick={()=>deleteData(params.id)}>Delete</Button>
        },
        
    }
    ];


    const [open, setOpen] = useState(false);
    
    const [openEdit, setOpenEdit] = useState(false);
    const [deleted,setDeleted]=useState(false);
    const [editData,setEditData]=useState({});
   
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setOpen(true);
    const handleEditClose = () => setOpen(false);


    const [state,setState]=useState([]);

const editHAndler=(data)=>{

  setEditData(data);
  setOpenEdit(true);


 



  


}

    const createRestaurant=(data)=>{
        const payload={name:data};
        axios.post("http://5.189.130.81:1337/restaurants",payload).then(res=>{
           
            setOpen(false);
           

        }).catch(err=>{
            console.log(err);
        })
        /// axios api 
    }

    const deleteData=(id)=>{


        axios.delete(`http://5.189.130.81:1337/restaurants/${id}`).then(res=>{
           
          setDeleted(!deleted);
           

        }).catch(err=>{
            console.log(err);
        })

        

    }

    const editRestaurant=(data,id)=>{

      const payload={name:data};
      axios.put(`http://5.189.130.81:1337/restaurants/${id}`,payload).then(res=>{
         
          setOpenEdit(false);
         

      }).catch(err=>{
          console.log(err);
      })
      /// axios api 
      
    }


    const getInitialData=()=>{
        axios.get("http://5.189.130.81:1337/restaurants").then(response=>{
        /// response here
      //  console.log(response.data);
        setState([...response.data]);
    }).catch(err=>{
        console.log(err);
    })
    }

useEffect(() => {
    getInitialData();
}, [open,deleted,openEdit]);

    return (
        <div style={{ height: 800, width: '100%' ,marginTop:"200px" }}>

<Button variant="contained" onClick={handleOpen} color="success" style={{marginBottom:"50px" }}>
  Create Restaurant
</Button>

{
  state.length>0? <DataGrid
  rows={state}
  columns={columns}
  pageSize={20}
  rowsPerPageOptions={[5,10,20]}
 
/>:""
}
       


<EditModal  editData={editData}  editRestaurant={editRestaurant} handleClose={handleEditClose}  handleOpen={handleEditOpen} open={openEdit}  />

      <AddEditModal createRestaurant={createRestaurant} handleClose={handleClose}  handleOpen={handleOpen} open={open}  /> 

      </div>
    )
}

export default View
