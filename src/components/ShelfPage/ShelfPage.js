import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, useEffect } from "react";
import { useState } from "react";


import { Button, Modal } from 'react-bootstrap';

import './ShelfPage.css';




function ShelfPage() {
  const dispatch = useDispatch();
  const shelfItems = useSelector((store) => store.itemReducer);

  const [show, setShow] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteItemId(id);
    setShow(true);
  }



  const handleDelete = () => {
    console.log("id", deleteItemId);
    dispatch({
      type: "DELETE_ITEM",
      payload: deleteItemId,
    });
    handleClose();
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ITEMS" });
  }, []);

  return (
<>
    <Modal show={show} onHide={handleClose}>
    <Modal.Body id="text">
      Are you sure you want to delete this item?
    </Modal.Body>
    <br></br>
    <Modal.Footer>
      <Button id="close" variant="secondary" onClick={handleClose} className="me-2">
        Cancel
      </Button>
      <Button id="delete" variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
 
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>

      {shelfItems ?
        shelfItems.map((item) => (
          <div key={item.id}>
            <br></br>
            <img src={item.image_url} width="300"/>
            <br></br>
            {item.description}
            <Button id="trigger-delete" variant="danger" onClick={() => handleShow(item.id)}>Delete</Button>
          
          </div>
        ))
        :
        (<p>Loading</p>)
      }



     
    </div>
    </>

  );
}

export default ShelfPage;
