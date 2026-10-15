import { Button, message } from "antd";

function TestAnt() {
  const handleClick = () => {
    message.success("OK");
  };

  return (
    <>
      <section id="center">
        <div>
          <h1>Welcome to Ant Design</h1>
          <Button type="primary" onClick={handleClick}>
            Click Me
          </Button>
        </div>
      </section>
    </>
  );
}

export default TestAnt;
