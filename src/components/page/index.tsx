import "./styles.scss";

export interface PageProps {
  name: string;
  children: any
}

export const Page = ({name, children}: PageProps) => {
  return (
    <div className="page">
      <div className="page-content">
        <h1>{name}</h1>
        {children}
      </div>
    </div>
  )
}
