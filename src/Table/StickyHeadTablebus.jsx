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

  faEye,
  faGears
  
} from "@fortawesome/free-solid-svg-icons";

const columns = [
  
  { 
    id: 'cooperative', 
    label: 'Cooperative', 
    minWidth: 50 
  },

  { 
    id: 'zone', 
    label: 'Zone', 
    minWidth: 50 
  },

  { 
    id: 'immatriculation', 
    label: 'Immatriculation', 
    minWidth: 50 ,
    
  },
  {

    id: 'marque',
    label: 'Marque',
    minWidth: 50,
    align: 'left',
    
  },
  {
    id: 'genre',
    label: 'Genre',
    minWidth: 50,
    align: 'left',
    
  },

  {
    id: 'type',
    label: 'Modèle',
    minWidth: 50,
    align: 'left',
 
  },
  {
    id: 'options',
    label: 'Options',
    minWidth: 50,
    align: 'left',
 
  },
 
];

function createData(cooperative,zone, immatriculation, marque, genre, type) {
 
  return {cooperative,zone, immatriculation, marque, genre, type};
}

export default function StickyHeadTableBus({data, onClick}) {

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
    
      data.map((bus)=>{
        rows.push(createData(bus.cooperative, bus.zone, bus.immatriculation, bus.marque, bus.genre, bus.type))
      })
      setRows(rows)
    
    
  }, [data]);


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='table-head'>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {<h4 className='header-text-table'>{column.label}</h4>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
         
          <TableBody>
            {
             rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.immatriculation}  >
                    
                    {columns.map((column) => {
                      const value = row[column.id];
                      if(column.id === "options"){
                        return (
                          <TableCell key={column.id} align={column.align} >
                            <div className='option-button-container'>
                              <FontAwesomeIcon onClick= {()=>{onClick(row.immatriculation, 1)}} icon= {faEye} className="icon-option"/>
                              <FontAwesomeIcon onClick= {()=>{onClick(row.immatriculation, 2)}} icon= {faGears} className="icon-option"/>
      
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <p className='value-text-table'>{ value}</p>
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