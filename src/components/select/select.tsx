import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface GridSelectProps {
  onSizeChange: (size: number) => void;
}

export const GridSelect: React.FC<GridSelectProps> = ({ onSizeChange }) => {
  const [gridSize, setGridSize] = useState<number>(5);
  const [maxGridSize, setMaxGridSize] = useState<number>(30);

  useEffect(() => {
    const calculateMaxGridSize = () => {
      const cellSize = 20;
      const gap = 5;
      const availableWidth = window.innerWidth - 40;
      const calculatedMax = Math.floor((availableWidth + gap) / (cellSize + gap));
      const clampedMax = Math.min(30, Math.max(5, calculatedMax));
      setMaxGridSize(clampedMax);

      if (gridSize > clampedMax) {
        setGridSize(clampedMax);
        onSizeChange(clampedMax);
      }
    };

    calculateMaxGridSize();
    window.addEventListener('resize', calculateMaxGridSize);

    return () => window.removeEventListener('resize', calculateMaxGridSize);
  }, [gridSize, onSizeChange]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const size = Number(event.target.value);
    setGridSize(size);
    onSizeChange(size);
  };

  const availableSizes = [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ].filter((size) => size <= maxGridSize);

  return (
    <FormControl fullWidth>
      <p>
        Размер сетки (макс. {maxGridSize}x{maxGridSize})
      </p>
      <Select
        labelId="grid-size-select-label"
        id="grid-size-select"
        value={gridSize}
        onChange={handleChange}
        sx={{
          color: '#000',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '10px',
          '& .MuiSelect-select': {
            padding: '0 !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 2px rgba(98, 0, 238, 0.2)',
          },
          '& .MuiSelect-icon': {
            color: '#000',
          },
          '& .MuiMenu-paper': {
            borderRadius: '8px',
            marginTop: '4px',
          },
          '& .MuiMenuItem-root': {
            color: '#000',
            padding: '10px 16px',
          },
        }}
      >
        {availableSizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}x{size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
