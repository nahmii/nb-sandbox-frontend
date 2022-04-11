import React from 'react'
import { Grid } from '@mui/material'
import classNames from 'classnames'
import { SectionProps } from '../../utils/SectionProps'
import Image from '../elements/Image'
import Button from '../elements/Button'

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}

const Hero = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...props
}) => {

    const outerClasses = classNames(
        'hero section center-content',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    )

    const innerClasses = classNames(
        'hero-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    )

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className='container-sm'>
                <div className={innerClasses}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className='btns'>
                            <h1 className='mt-0 mb-16 reveal-from-bottom' data-reveal-delay='200'>
                                Build the future today.
                            </h1>
                            <p className='m-0 mb-32 reveal-from-bottom' data-reveal-delay='400'>
                                We invest in the potential of crypto by backing companies, protocols and innovative ideas.
                            </p>
                            <div className='reveal-from-bottom' data-reveal-delay='600'>
                                <Button className='button button-primary button-wide-mobile button-sm'> Get access </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>

                            <div className='hero-figure reveal-from-bottom illustration-element-01' data-reveal-value='20px' data-reveal-delay='800'>
                                <Image
                                    src={require('./../../assets/images/hero-image.png')}
                                    alt='Hero'
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    )
}

Hero.propTypes = propTypes
Hero.defaultProps = defaultProps

export default Hero