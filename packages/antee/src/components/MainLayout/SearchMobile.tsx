import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import React from 'react';

interface SearchMobileProps {
  isOpenSearch: boolean;
  handleOpenSearch: any;
}
const SearchMobile = ({
  isOpenSearch,
  handleOpenSearch,
}: SearchMobileProps) => {
  return (
    <div>
      <div style={{ width: '250px' }}>
        <Drawer
          style={{ width: '250px' }}
          anchor="top"
          open={isOpenSearch}
          onClose={handleOpenSearch}
        >
          <Box sx={{ width: 250 }} role="presentation">
            <TextField
              className="navbar-brand"
              id="standard-basic"
              label="Tìm kiếm"
              variant="standard"
              style={{
                padding: '2px',
                width: '160px',
                height: 'auto',
                top: 0,
              }}
            />
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default SearchMobile;
