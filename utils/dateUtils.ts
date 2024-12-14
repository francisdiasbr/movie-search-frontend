import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Muda de 2024-12-11T10:05:00.000Z para 11 de dez. de 2024 às 10:05

export const formatDate = (data: string): string => {
  const date = new Date(data);
  if (isNaN(date.getTime())) {
    console.error('Data inválida:', data);
    return 'Data inválida';
  }
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });
  return formattedDate;
};
