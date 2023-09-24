import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';
import CardActions from '@mui/material/CardActions';


const Porductcard = (product) => {

  

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.productImg} // Assuming ImageUrl is the URL of the product image
        alt={product.productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productDesc}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: {product.productprice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link href={product.productUrl} target="_blank" rel="noopener noreferrer">
            View Product
          </Link>
        </Button>
      </CardActions>
    </Card>
    </>
  )
}

export default Porductcard
