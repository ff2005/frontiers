import "./styles.scss";

export interface TypographyProps {
  children: React.ReactNode;
}

export interface TypographyStaticProps {
  P: typeof P;
  H1: typeof H1;
}

export const Typography: React.FC<TypographyProps> & TypographyStaticProps = ({
  children,
}) => {
  return <span className="typography">{children}</span>;
};

const P = ({ children }: TypographyProps) => {
  return <p className="typography">{children}</p>;
};

Typography.P = P;

const H1 = ({ children }: TypographyProps) => {
  return (
    <div className="typography">
      <h1>{children}</h1>
    </div>
  );
};

Typography.H1 = H1;
