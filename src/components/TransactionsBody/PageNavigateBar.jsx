//
import PropTypes from 'prop-types';
//styles
import "./TransactionsBody.css"
//assetes
import leftArrowIcon from "../../assets/leftArrow.svg";
import rightArrowIcon from "../../assets/rightArrow.svg";
//components
import Button from '../Button/Button';

const PageNavigateBar = ({ pages, updatePage }) => {
PageNavigateBar.propTypes = {
    pages: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired
    }).isRequired,
    updatePage: PropTypes.func.isRequired
};
    return ( 
        <div className='TransactionBar PageNavigateBar'>
            <Button 
            icon={leftArrowIcon} 
            buttonSize="smallButton" 
            background={pages.currentPage === 1 ? "" : "shadow"} 
            clickFunction={()=> updatePage("left")}
            />
            <Button 
            text={pages.currentPage} 
            buttonSize="mediumButton" 
            background="backgroundDarkGreen" 
            />
            <Button 
            icon={rightArrowIcon} 
            buttonSize="smallButton" 
            background={pages.currentPage === pages.totalPages ? "" : "shadow"} 
            clickFunction={()=> updatePage("right")}
            />
        </div>
    );
};

export default PageNavigateBar;