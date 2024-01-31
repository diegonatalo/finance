import { Toaster as ReactHotToast } from 'react-hot-toast'

export const Toaster = () => (
  <ReactHotToast
    position="bottom-right"
    reverseOrder={true}
    toastOptions={{
      iconTheme: {
        primary: '#f4f4f5',
        secondary: '#18181b'
      },
      style: {
        color: '#f4f4f5'
      },
      success: {
        style: {
          background: '#059669'
        }
      },
      error: {
        style: {
          background: '#dc2626'
        }
      },
      loading: {
        style: {
          color: '#18181b'
        }
      }
    }}
  />
)
