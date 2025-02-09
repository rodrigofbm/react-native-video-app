import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: () => Promise<any> ) => {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        try {
            setData(await fn());
        } catch (e: any) {
            Alert.alert('Error', e.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => fetchData()

    return { isLoading, data, refetch };
}

export default useAppwrite;
