
// Formato corto → "24.10.2025"
export const formatDateShort = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Formato para detalle → ["Friday", "24 Oct"]
export const formatDateDetail = (dateStr) => {
  if (!dateStr) return ['', ''];
  const date = new Date(dateStr);
  if (isNaN(date)) return ['', ''];
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  return [weekday, `${day} ${month}`];
};

// Formato para input tipo <input type="date" />
export const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const date = new Date(dateStr);
  return !isNaN(date) ? date.toISOString().split('T')[0] : '';
};

// Formato bonito → "Friday 24.10.2025"
export const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
};
