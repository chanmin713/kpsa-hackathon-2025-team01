import { X } from "lucide-react"

type MedicineItemProps = {
    name: string
    explaination: string
    onRemove?: () => void
}

const MedicineItem = ({ name, explaination, onRemove }: MedicineItemProps) => {
    return (
        <div
            className="flex items-center justify-between p-4 mb-3 rounded-xl bg-white shadow-md"
        >
            <div className="flex gap-5 items-center">
                <span className="font-semibold text-base text-black">{name}</span>
                <span className="text-sm text-gray-500">{explaination}</span>
            </div>
            {onRemove && (
                <button onClick={onRemove}>
                    <X color="gray" />
                </button>
            )}
        </div>
    )
}

export default MedicineItem
