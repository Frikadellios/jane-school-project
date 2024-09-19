const Button = ({
  link,
  label,
  style,
  size,
  icon
}: {
  link?: string
  label: string
  style?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'large' | 'small' | 'tiny' | 'wide'
  icon?: React.ReactNode
}) => {
  const sizeClasses = {
    default: '',
    large: 'btn-lg',
    small: 'btn-sm',
    tiny: 'btn-xs',
    wide: 'btn-wide'
  }
  return (
    <button
      type="button"
      className={`
          btn 
          ${style === 'primary' ? 'btn-primary' : ''}
          ${style === 'secondary' ? 'btn-secondary' : ''}
          ${style === 'accent' ? 'btn-accent' : ''}
          ${style === 'info' ? 'btn-info' : ''}
          ${style === 'success' ? 'btn-success' : ''}
          ${style === 'warning' ? 'btn-warning' : ''}
          ${style === 'error' ? 'btn-error' : ''}
          ${style === 'outline' ? 'btn-outline' : ''}
          ${style === 'ghost' ? 'btn-ghost' : ''}
          ${style === 'link' ? 'btn-link' : ''}
          ${sizeClasses[size as keyof typeof sizeClasses] || ''}
        `}
    >
      {icon && <span className="icon">{icon}</span>}
      {link ? <a href={link}>{label}</a> : label}
    </button>
  )
}

export default Button
