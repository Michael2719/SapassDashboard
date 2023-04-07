import  {React, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './table.css'
import {  
  faBusAlt,
  faEye,
  faGears
  
} from "@fortawesome/free-solid-svg-icons";

const columns = [
  { 
    id: 'name', 
    label: 'Nom', 
    minWidth: 50 ,
    
  },
  
  { 
    id: 'afterName', 
    label: 'Prenoms', 
    minWidth: 50 
  },
  {

    id: 'cin',
    label: 'CIN',
    minWidth: 50,
    align: 'left',
    
  },
  {
    id: 'tel',
    label: 'Téléphone',
    minWidth: 50,
    align: 'left',
    
  },

  {
    id: 'userId',
    label: 'Identifiant Sapass',
    minWidth: 50,
    align: 'left',
 
  },
  {
    id: 'options',
    label: 'Actions',
    minWidth: 50,
  
    align: 'center',
 
  }
];

function createData(name, afterName, cin, tel, userId) {
 
  return { name, afterName, cin, tel, userId };
}

export default function StickyHeadTable({data, onClick}) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
      const rows = [];
    
      data.map((collab)=>{
        rows.push(createData(collab.nom, collab.prenom, collab.numeroCin, collab.numero, collab.id))
      })
      setRows(rows)
    
    
  }, [data]);


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {<h4 className='column-label'>{column.label}</h4>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
         
          <TableBody>
            {
             rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}  >
                    
                    {columns.map((column) => {
            
                      const value = row[column.id];
                      if(column.id === "options"){
                        return (
                          <TableCell key={column.id} align={column.align} >
                            <div className='option-button-container'>
                              <FontAwesomeIcon onClick= {()=>{onClick(row.userId, 1)}} icon= {faEye} className="icon-option"/>
                              <FontAwesomeIcon onClick= {()=>{onClick(row.userId, 2)}} icon= {faGears} className="icon-option"/>
                              <FontAwesomeIcon onClick= {()=>{onClick(row.userId, 3)}}icon= {faBusAlt} className="icon-option"/>
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <p className='column-value'>{ value}</p>
                        </TableCell>
                      );

                     
                    })}

                    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    </Paper>
  );
}