import CustomCard from '../../components/custom-card/CustomCard'

type DummyProps = {
  content: string
}

export default function Dummy({ content }: DummyProps) {
  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <CustomCard>{content}</CustomCard>
        </div>
      </div>
    </div>
  )
}
