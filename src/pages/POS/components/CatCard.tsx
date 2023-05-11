import { Space, Typography } from "antd";
import Category from "../../../models/Category";
import { MdFastfood } from "react-icons/md";

const { Title } = Typography;

export function CatCard({
  cat,
  selectedCatID,
  setSelectedCatID,
}: {
  cat: Category;
  selectedCatID: number;
  setSelectedCatID: (n: number) => void;
}) {
  let activeClass = "";
  let activeIconColor = "#dddddd";
  if (selectedCatID === cat.id) {
    activeClass = "shop-category-card-active";
    activeIconColor = "#2d81ff";
  }

  //active-class: shop-category-card-active
  return (
    <div
      className={"shop-category-card " + activeClass}
      onClick={() => setSelectedCatID(cat.id)}
    >
      <Space
        align="center"
        size={"middle"}
        style={{ width: "100%", justifyContent: "left" }}
      >
        <MdFastfood fontSize={18} color={activeIconColor} />
        <Title level={5} style={{ margin: 0 }}>
          {cat.name}
        </Title>
      </Space>
    </div>
  );
}
