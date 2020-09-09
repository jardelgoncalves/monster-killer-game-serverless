export const abs = (value, limite = 0, type = 'min') => 
  type === 'max'
    ? Math.max(value, limite)
    : Math.min(value, limite); 
