import { Card, Flex, Image, theme, Typography } from "antd";
import HeartSvg from "../Assets/SvgComponents/HeartSvg";
import EditSvg from "../Assets/SvgComponents/EditSvg";
import DeleteSvg from "../Assets/SvgComponents/DeleteSvg";
import EmailSvg from "../Assets/SvgComponents/EmailSvg";
import PhoneSvg from "../Assets/SvgComponents/PhoneSvg";
import WebsiteSvg from "../Assets/SvgComponents/WebsiteSvg";

export interface ICard {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  isLiked: boolean;
}

function UserCard({
  cardData,
  deleteCard,
  editCard,
  likeCard,
}: {
  cardData: ICard;
  deleteCard: (card: ICard) => void;
  editCard: (card: ICard) => void;
  likeCard: (card: ICard) => void;
}) {
  const { Title, Text } = Typography;
  const {
    token: { colorBgSolid, colorBorder },
  } = theme.useToken();

  return (
    <Card
      key={cardData.name}
      styles={{
        body: {
          padding: 0,
        },
      }}
      style={{
        border: "1px solid",
        borderColor: colorBorder,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(200px,auto,auto)",
        borderRadius: "4px",
        flex: "1 1 calc(25% - 16px)",
        maxWidth: "calc(25% - 16px)",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          height: "200px",
          width: "100%",
          background: colorBgSolid,
          display: "grid",
          placeContent: "center",
        }}
      >
        <Image
          src={`https://api.dicebear.com/9.x/dylan/svg?seed=${cardData.name}`}
          alt="user-image"
          style={{
            height: "200px",
            objectFit: "contain",
            margin: "auto",
          }}
        />
      </div>
      <div style={{ padding: "12px 24px" }}>
        <Title style={{ display: "block", fontSize: "16px" }}>
          {cardData.name}
        </Title>
        <Flex gap={"8px"} align="center" style={{ cursor: "pointer" }}>
          <EmailSvg />
          <Text style={{ display: "block" }}>{cardData.email}</Text>
        </Flex>
        <Flex gap={"8px"} align="center" style={{ cursor: "pointer" }}>
          <PhoneSvg />
          <Text style={{ display: "block" }}>{cardData.phone}</Text>
        </Flex>

        <Flex gap={"8px"} align="center" style={{ cursor: "pointer" }}>
          <WebsiteSvg />
          <Text style={{ display: "block" }}>{cardData.website}</Text>
        </Flex>
      </div>
      <Flex
        style={{
          borderTop: "1px solid",
          borderColor: colorBorder,
          padding: "12px",
          background: colorBgSolid,
        }}
        justify="space-around"
        align="center"
      >
        <HeartSvg
          height={"20px"}
          width={"20px"}
          cursor={"pointer"}
          onClick={() => likeCard(cardData)}
          fill={cardData.isLiked ? "red" : ""}
        />

        <hr style={{ height: "12px" }} />
        <EditSvg
          height={"18px"}
          width={"18px"}
          className="editSvg"
          cursor={"pointer"}
          onClick={() => editCard(cardData)}
        />
        <hr style={{ height: "12px" }} />
        <DeleteSvg
          height={"18px"}
          width={"18px"}
          className="deleteSvg"
          cursor={"pointer"}
          onClick={() => deleteCard(cardData)}
        />
      </Flex>
    </Card>
  );
}

export default UserCard;
