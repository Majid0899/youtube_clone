import React from 'react'

const SideBarFooter = () => {
  return (
    <div className="text-xs text-gray-600 dark:text-gray-400 mx-4 mb-8 max-sm:mb-14">
                        <div className="flex flex-wrap gap-x-2">
                            <span className="cursor-pointer hover:underline">About</span>
                            <span className="cursor-pointer hover:underline">Press</span>
                            <span className="cursor-pointer hover:underline">Copyright</span>
                            <span className="cursor-pointer hover:underline">Contact us</span>
                            <span className="cursor-pointer hover:underline">Creator</span>
                            <span className="cursor-pointer hover:underline">Advertise</span>
                            <span className="cursor-pointer hover:underline">Developers</span>
                        </div>

                        <div className="flex flex-wrap gap-x-2">
                            <span className="cursor-pointer hover:underline">Terms</span>
                            <span className="cursor-pointer hover:underline">Privacy</span>
                            <span className="cursor-pointer hover:underline">Policy & Safety</span>
                            <span className="cursor-pointer hover:underline">How YouTube works</span>
                            <span className="cursor-pointer hover:underline">Test new features</span>
                        </div>

                        <div className="mt-2">&copy; 2025 Google LLC</div>
                    </div>
  )
}

export default SideBarFooter