import { styled } from "../../stitches.config";
import LinkItem from 'src/components/LinkItem';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '$4',
  paddingLeft: '$2',

  '@bp1': {
    marginTop: '$8',
    paddingLeft: '0',
  }
});

const PageTitle = styled('h1', {
  fontSize: '$4',
  fontFamily: '$title',
  lineHeight: '2.6rem',
  marginBottom: '0.5rem'
})

const PageSubtitle= styled('span', {
  fontSize: '$2',
  fontFamily: '$text',
  color: '#979797',
  fontWeight: '500',
  lineHeight: '2.6rem',
  paddingBottom: '$4',
  borderBottom: '1px dashed #A0A0A0'
})

const LeftBorder = styled('div', {
  width: '1px',
  height: '100%',
  borderRight: '1px dashed #A0A0A0',
  position: 'absolute',
  marginLeft: '-1.6rem',

  '@bp1': {
    marginLeft: '-2.4rem',
  }
})


const BlogComponent = ({title, subtitle, posts}: {title: string, subtitle: string, posts: any}) => {
  return (
    <Container>
      <LeftBorder />
      <PageTitle>{title}</PageTitle>
      <PageSubtitle>{subtitle}</PageSubtitle>
      {posts.map(({title, desc, action, leftText, subtitle, href, external}: {title: string, href: string, desc: string, action: string, leftText?: string, subtitle?: string, external?: boolean}, index: any) => (
        <LinkItem 
          title={title}
          desc={desc}
          action={action}
          leftText={leftText}
          key={index}
          subtitle={subtitle}
          external={external}
          href={href}
        />
      ))}

    </Container>
  )
}

export default BlogComponent
