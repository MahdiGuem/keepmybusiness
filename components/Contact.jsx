import Image from 'next/image';

const Contact = (props) => {
  return (
    <div className="w-full flex justify-center marker gap-5" id={props.id}>
        <div className='bg_image w-1/3 h-screen'/>

        <div className="flex flex-col w-2/3 gap-3 sm:m-10 mt-5 justify-center">
            <h1 className="head_text">Contact Us</h1>
            <form method="POST" action="">
                <div className="grid grid-cols-2 gap-1">
                    <div className="flex flex-col">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form_input"/>
                    </div>

                    <div className="flex flex-col">
                    <label>Birthdate</label>
                    <input type="date" name="birthdate" className="form_input" />
                    </div>

                    <div className="flex flex-col">
                    <label>Personal Email</label>
                    <input type="email" name="pmail" className="form_input" />
                    </div>

                    <div className="flex flex-col">
                    <label>Business Email</label>
                    <input type="email" name="bmail" className="form_input" />
                    </div>

                </div>
                <div className="flex flex-col">
                <label>About your business</label>
                <textarea name="message" className="form_input min-h-20"></textarea>
                </div>
                <div className="flex mt-3 flex-between center">
                <button type="submit" className="green_btn">Send request</button>
                <p className="text-gray-700 italic text-sm text-right w-3/5">(confirmation will be sent to your personal email)</p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact;