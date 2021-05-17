import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import { loadImages } from '../../actions/index';
import Button from '../Button/Button';
import Stats from '../Stats';

class ImageGrid extends Component {

    componentDidMount() {
        this.props.loadImages();
    }

    render() {
        const { images, error, isLoading, loadImages, imageStats } = this.props;
        return (
            <div className="content">
                <section className="grid">
                    {images.map(image => (
                        <div
                            key={image[0].id}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <Stats stats={imageStats[image[0].id]} />
                            <img
                                src={image[0].urls.small}
                                alt={image[0].user.username}
                            />
                        </div>
                    ))}
                </section>
                {error && <div className="error">{JSON.stringify(error)}</div>}
                <Button onClick={() => !isLoading && loadImages()} loading={isLoading}>
                    Load More
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({ isLoading, error, images, imageStats }) => ({
    isLoading,
    error,
    images,
    imageStats
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageGrid);
