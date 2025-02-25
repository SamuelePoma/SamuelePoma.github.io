// TailwindCSS configuration for the entire site
tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 2s ease-in forwards',
          slideUp: 'slideUp 1s ease-out'
        },
        keyframes: {
          fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
          slideUp: { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } }
        }
      }
    }
  };
  