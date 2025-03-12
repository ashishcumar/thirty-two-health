import { useEffect, useState } from "react";
import UserCard, { ICard } from "./Components/UserCard";
import { Flex, Form, Image, Modal, theme, message } from "antd";
import useApiHook from "./CustomHooks/useApiHook";
import loader from "./Assets/loader.svg";
import UserModalForm from "./Components/UserModalForm";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [cardsList, setCardsList] = useState<ICard[]>([]);
  const [editCardData, setEditCardData] = useState<ICard | undefined>(
    cardsList[0]
  );
  const { getCardsJson, loading } = useApiHook();
  const {
    token: { colorBorder, colorTextLabel },
  } = theme.useToken();
  const [form] = Form.useForm();

  const likeCard = (card: ICard) => {
    setCardsList((prev) =>
      prev.map((item) => {
        if (item.name === card.name) {
          return {
            ...item,
            isLiked: !item.isLiked,
          };
        }
        return item;
      })
    );
  };
  const editCard = (card: ICard) => {
    setEditCardData(card);
  };
  const deleteCard = (card: ICard) => {
    setCardsList((prev) => prev.filter((item) => item.name !== card.name));
  };

  const isObjectSame = (
    obj1: ICard,
    obj2: { [key: string]: string | number | boolean }
  ) => {
    console.log({ obj1, obj2 });

    if (obj1 == undefined || obj2 == undefined) return;
    const { isLiked, id, ...remainingObj1 } = obj1;
    for (let key in remainingObj1) {
      if (remainingObj1[key as keyof typeof remainingObj1] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Data:", values);
      if (Object.values(values).some((item) => item === undefined)) {
        messageApi.open({
          type: "error",
          content: "All Fields Required.",
        });
        return;
      }

      if (isObjectSame(editCardData as ICard, values)) {
        messageApi.open({
          type: "success",
          content: "Form Submitted - Nothing Changed.",
        });
      } else {
        setCardsList((prev) =>
          prev.map((item) => {
            if (item.id === values.id) {
              return {
                id: item.id,
                ...values,
              };
            }
            return item;
          })
        );
        messageApi.open({
          type: "success",
          content: "Form Submitted!",
        });
      }

      setEditCardData(undefined);
      form.resetFields();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  useEffect(() => {
    if (cardsList?.length == 0) {
      getCardsJson().then((res) => {
        setCardsList(res as ICard[]);
      });
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        open={editCardData !== undefined}
        title={"Basic Modal"}
        styles={{
          body: {
            padding: "12px",
          },
          content: {
            padding: 0,
          },
          header: {
            padding: "12px",
            border: "1px solid",
            borderColor: colorBorder,
            color: colorTextLabel,
            overflow: "hidden",
          },
          footer: {
            padding: "12px",
            border: "1px solid",
            borderColor: colorBorder,
            overflow: "hidden",
          },
        }}
        onOk={handleSubmit}
        onCancel={() => setEditCardData(undefined)}
      >
        <UserModalForm form={form} cardData={editCardData!} />
      </Modal>

      {loading ? (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Image src={loader} alt="loader image" height={"48px"} />
        </div>
      ) : cardsList?.length ? (
        <Flex wrap={"wrap"} gap={"16px"} style={{ padding: "24px" }}>
          {cardsList.map((item) => {
            return (
              <UserCard
                cardData={item}
                key={item.name}
                deleteCard={deleteCard}
                editCard={editCard}
                likeCard={likeCard}
              />
            );
          })}
        </Flex>
      ) : null}
    </>
  );
}

export default App;
