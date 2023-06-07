import TestShow from "../../components/TestShow";
import VaccineShow from "../../components/VaccineShow";

export const tabItems = [
  {key: 'test', title: '核酸检测结果', content: <TestShow/>},
  {key: 'vaccine', title: '疫苗接种信息', content: <VaccineShow/>}
]
export const tabMap = {
  'test': <TestShow/>,
  'vaccine': <VaccineShow/>
}