import React from 'react'

function Contactus(props) {
  return (
    <section className='mb-4'>
        <div className='container'>
            <h2 className='h1-responsive font-weight-bold text-center my-4'>
                Contact Us
            </h2>
            <p className='text-center w-resposive mx-auto mb-5'>
                Do you have any question? Please do not hesitate to contact us directly. 
                Our team will come back to you within a matter of hours to help you.
            </p>
            <div className='row'>
                <div className='col-md-9 mb-md-0 mb-5'>
                    <form>
                        <div className='row'>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <input type='text' name='name' className='form-control' placeholder='name' />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <input type='text' name='email' className='form-control' placeholder='Email' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='form-group'>
                        <input type='text' name='subject' className='form-control' placeholder='Subject' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='form-group'>
                        <textarea type='text' name='message' rows='2' className='form-control md-textarea' placeholder='Message' />
                    </div>
                </div>
            </div>
                    </form>
                    <div className='text-center text-md-left'>
                        <button className='btn btn-primary'>Send</button>
                    </div>
                    <div className='status'></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contactus