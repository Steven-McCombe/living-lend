import React, { useState } from "react";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';


const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      category: "",
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MDBModal show={isOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Add Product</MDBModalTitle>
            <MDBBtn color="close" onClick={onClose}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
      <form id="addProductForm" onSubmit={handleSubmit}>
        
        {/* Name field */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        {/* Description field */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        {/* Image field */}
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
        
        {/* Price field */}
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        
        {/* Quantity field */}
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
        />
        
        {/* Category field */}
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Living Room">Living Room</option>
          <option value="Dining Room">Dining Room</option>
          <option value="Bedroom">Bedroom</option>
        </select>
      </form>

      </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={onClose}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" type="submit" form="addProductForm">
              Add Product
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default AddProductModal;
