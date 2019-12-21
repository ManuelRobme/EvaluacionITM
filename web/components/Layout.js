
import HeadImports from './HeadImports';

const Layout = (props) =>
    <>
        <HeadImports />
        <div class="wrapper">
            <div class="cover">

                {props.children}

            </div>
        </div>


    </>
export default Layout


