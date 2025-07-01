import { useRouter } from 'expo-router';


const Back = () => {
  const r = useRouter()
  if(r.canGoBack())
    return r.back()
}

export default Back;
