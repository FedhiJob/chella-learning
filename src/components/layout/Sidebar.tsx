import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  CheckCircle2,
  Users,
  ReceiptText,
  Send,
  User,
  LogOut,
 
} from "lucide-react"

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CheckCircle2, label: "Tasks", href: "/dashboard/tasks" },
    { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
    { icon: ReceiptText, label: "Transactions", href: "/dashboard/transactions" },
    { icon: Send, label: "Transfer", href: "/dashboard/transfer" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ]

  return (
    <>
   
      <aside className=" flex w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0 flex-col">
     
        <div className="p-6 border-b border-gray-800">
          <Link to="/dashboard" className="text-2xl font-bold font-montserrat">
            <span className="text-yellow-500">Chella</span>
          </Link>
        </div>

       
        <nav className="py-8 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return (
              <Link key={item.href} to={item.href}>
                <div
                  className={`mx-4 px-4 py-3 rounded-lg flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:text-yellow-500 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

      
        <div className="px-4 pb-6">
          <button className="w-full px-4 py-3 bg-red-900/20 text-red-400 rounded-lg flex items-center gap-3 hover:bg-red-900/40 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

    
     
    </>
  )
}
