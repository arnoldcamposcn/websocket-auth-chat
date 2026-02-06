


export const formatDate = (date: Date | null | undefined): string => {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }