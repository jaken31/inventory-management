'use client'
import Image from "next/image";

import { useState, useEffect } from "react";
import {firestore} from "../firebase";
import { Box, Typography, Modal, Stack, Button, TextField } from "@mui/material";
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc, updateDoc} from "firebase/firestore";
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInvetory = async () => { 
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) =>  {
      inventoryList.push({ name: doc.id, ...doc.data()}) 
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInvetory()
  }, [])

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'inventory', item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await updateDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInvetory()
  }
  const addItem = async (item) => {
    const docRef = doc(firestore, 'inventory', item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInvetory()
  }
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  return (
  <Box bgcolor="blueviolet" width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
    <Box width="39%" height="40%" border="2px solid #000" borderRadius="30px" padding="20px" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column" bgcolor="white">
      <Modal open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" width={400} border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} bgcolor={"#fff"} sx={{ transform: "translate(-50%, -50%)" }}>
          <Typography variant= "h6">Add Item</Typography>
          <Stack width={"100%"} direction="row" spacing={2}>
            <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)}></TextField>
          </Stack>
          <Button variant="outlined" onClick={() =>{ 
            addItem(itemName); 
            setItemName(""); 
            handleClose();}}>Add new item</Button>
        </Box>
      </Modal>
      <Button border="2px solid #000" variant="outlined" onClick={handleOpen}>Add Item</Button>
      
      <Typography variant="h2"> Inventory Items</Typography>
      <Stack width="1000px" height="400px" direction="column" spacing={2} overflow="auto"> 
            {inventory.map(({name, quantity}) => (
              <Box key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="2px solid #000"
              borderRadius="30px"
              padding="20px"
              >
                <Typography variant="h3" fontSize="40px" color="#333" textAlign="center"> {quantity}</Typography>
                <Typography variant="h3" fontSize="30px" color="#333" textAlign="center"> {name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                <Button variant="outlined" onClick={() => addItem(name)}>Add</Button>
                <Button variant="outlined" onClick={() => removeItem(name)}>Remove</Button>
              </Box>
        ))}
      </Stack>
    </Box>
  </Box>
    
  );
}
