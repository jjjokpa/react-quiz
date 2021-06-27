import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
			  
		  </IconButton>
          <Typography>Test</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
