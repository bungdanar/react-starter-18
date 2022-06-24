import CustomLoader from '../custom-loader/CustomLoader'

export default function Fallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CustomLoader size={50} />
    </div>
  )
}
