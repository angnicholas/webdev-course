import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableHead } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { getFromApi } from '../services/requests';

import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";


function TablePaginationActions(props) {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



// function createData(dateCreated, dateUpdated, title, summary, riskScore, id) {
//   return {dateCreated, dateUpdated, title, summary, riskScore, id };
// }

// const rows = [
//   createData("06 May 2022","06 May 2022", 'Sample Title', 'Sample Summary', 65, "fs23423"),
//   createData("31 Aug 2022","06 May 2022", 'Sample Title', 'Sample Summary', 60, "sdf6432423"),
// ];

const CustomPaginationActionsTable = (props) => {
  const location = useLocation();
  const state = location.state;
  const name = state.name;
  const id = state.id;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const resDataToContent = (resData) => {
      var final_array = [];
      resData.forEach((x, i) => {

        const dateToString = (utcDate) => {
          const lastUpdateDateTime = new Date(utcDate);
          return lastUpdateDateTime.toDateString();
        }

        const dateToObj = (utcDate) => {
          const x = new Date(utcDate);
          return x
        }

        const avSentiment = x['sentiment']['positive'] - x['sentiment']['negative']
        const riskScore = Math.round((-avSentiment+1)*50)

        final_array.push({
          'id':x['id'],
          'dateCreatedObject': dateToObj(x['date_created']),
          'dateCreated':dateToString(x['date_created']),
          'dateUpdated': dateToString(x['date_updated']),
          'title':x['title'],
          'summary':x['text'].slice(0, 30).concat('...'),
          'riskScore':riskScore,
        });

      });

      console.log(final_array)

      final_array.sort((a, b) => b.dateCreatedObject - a.dateCreatedObject);
      
      console.log(final_array);

      return final_array;
    };
    console.log('rows', rows)
    getFromApi(`dashboard/journalentries/${id}/`, setContent, setLoading, resDataToContent);

    // console.log('intermediate', (rowsPerPage > 0
    //   ? content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //   : content
    // ));

  }, []);

  return (
    <>
    {loading === true ? (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <Backdrop sx={{ color: "grey" }} open={true} /> */}
      <CircularProgress />
    </div>
    ) : (
      <>
    <div>
    <div><h1 style={{ fontFamily: "Arial" }}>{name}</h1></div>  
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableCell>Date added</TableCell>
            <TableCell>Date modified</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Risk Score</TableCell>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
              <TableRow key={row.name} style={{ textDecoration: 'none' }}>
                <TableCell component="th" scope="row" style={{ width: 150 }}>
                  {row.dateCreated}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: 150 }}>
                  {row.dateUpdated}
                </TableCell>
                <TableCell style={{ width: 150 }}>
                <Link to={"/journalentry"} state={{
                  title: row.title, id: row.id
                }}>
                  {row.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {row.summary}
                </TableCell>
                <TableCell style={{ width: 160, 
                  color: `${row.riskScore > 70 ? 'red' : 'black'}`,
                  fontWeight: `${row.riskScore > 70 ? 'bold' : 'normal'}`,
                  }} align="right">
                  {row.riskScore}
                </TableCell>
              </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
    </>
    )}
    </>
    
  );
}

export default CustomPaginationActionsTable;
